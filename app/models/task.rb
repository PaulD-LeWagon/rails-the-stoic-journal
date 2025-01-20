class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks, inverse_of: :task, dependent: :destroy

  attribute :duration, :duration

  store_accessor :recurs_on, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday

  accepts_nested_attributes_for :subtasks, reject_if: proc { |attributes| attributes["title"].blank? || attributes["_destroy"] == "1" }, allow_destroy: true

  before_save :hms_to_duration

  after_find do |task|
    # p task.duration.class, task.duration
  end

  after_initialize :set_default_start_date, if: :new_record?
  after_initialize :update_duration

  NONE_ROUTINE_NAME = :not_recuring

  enum routine: [NONE_ROUTINE_NAME, :morning, :day, :evening]
  enum task_type: [:general, :event, :fitness, :admin, :work, :self_development, :spiritual, :stoic_exercise, :stoic_discipline]

  default_scope { where(active: true).order(:start_date) } # completed: false ???

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }

  scope :filter_by_user_routines, ->(user, routine) { where("user_id = ? AND routine = ?", user.id, routines[routine]) }

  validates :title, :user_id, :start_date, presence: true

  def duration_to_hms
    sec = self.duration.to_i
    "%02d:%02d:%02d" % [sec / 3600, sec / 60 % 60, sec % 60]
  end

  def hms_to_duration
    if /^\d{2}:\d{2}:\d{2}?$/.match(self.duration.to_s)
      self.duration = ActiveSupport::Duration.build(self.duration.split(":").map(&:to_i).inject(0) { |a, b| a * 60 + b })
    end
  end

  def update_duration
    if self.subtasks.any?
      self.duration = self.subtasks.pluck(:duration).map { |duration| ActiveSupport::Duration.build(duration.to_i) }.sum
    end
  end

  def routine?
    self.routine != NONE_ROUTINE_NAME.to_s
  end

  def self.transform_routines_for_html_select
    self.routines.each_with_object({}) { |(item, index), r| r[item.gsub("_", " ").titleize] = item }
  end

  def self.transform_task_types_for_html_select
    self.task_types.each_with_object({}) { |(item, index), t| t[item.gsub("_", " ").titleize] = item }
  end

  def clone_for_next_occurence
    # Stoic Exercise Routine - will be the only ones with AI generated feedback
    is_stoic_exercise_routine = self.task_type == "stoic_exercise"
    # Clone the task
    new_task = self.dup
    # Clear out user's comments and any AI generated feedback
    new_task.comment = ""
    new_task.ai_feedback = ""
    new_task.completed = false
    # Set the new task to the next occurence
    # Need to work out when the next occurence is...
    new_task.start_date = self.find_next_occurence
    # Save the newly cloned task
    new_task.save!
    # Clone the subtasks if they exist
    self.subtasks.each do |subtask|
      new_subtask = subtask.dup
      new_subtask.task = new_task
      new_subtask.completed = false
      # AI generated feedback
      new_subtask.comment = ""
      new_subtask.ai_feedback = ""
      new_subtask.save!
    end
  end

  private

  def set_default_start_date
    self.start_date = Time.now if self.start_date.nil?
  end

  def find_next_occurence
    # Need to work out when the next occurence is...
    time = self.start_date.strftime("%H:%M")
    date = Time.now.strftime("%d-%m-%Y")
    today = Time.parse("#{date} #{time}")
    7.times do |i|
      j = i + 1
      the_date = today + j.day
      this_day = eval("self.#{(the_date).strftime("%A").downcase}")
      # Was originally actual boolean values, but the frontend
      # has switched to a string value of "1" or "0" ???
      if this_day.class == String && this_day == "1" || this_day.class == Integer && this_day == 1
        return the_date
      end
    end
  end
end
