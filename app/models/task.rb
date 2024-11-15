class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks, inverse_of: :task, dependent: :destroy

  store_accessor :recurs_on, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday

  accepts_nested_attributes_for :subtasks, reject_if: proc { |attributes| attributes["title"].blank? || attributes["_destroy"] == "1" }, allow_destroy: true

  after_initialize :set_default_start_date, if: :new_record?

  before_save :set_initial_order, if: :new_record?

  NONE_ROUTINE_NAME = :not_recuring

  enum routine: [NONE_ROUTINE_NAME, :morning, :day, :evening]
  enum task_type: [:general, :event, :fitness, :admin, :work, :self_development]

  default_scope { order(:order) }

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }

  scope :filter_by_user_routines, ->(user, routine) { where("user_id = ? AND routine = ?", user.id, routines[routine]) }

  validates :title, presence: true
  validates :user_id, presence: true

  # validates_date_of :start_date, before: :due_date, message: "Must be before 'Due Date!'"
  # validates_date_of :start_date, after_or_equal_to: Proc.new { Time.now }, message: "Valid 'Start Date' must be from today onwards!"

  def routine?
    self.routine != NONE_ROUTINE_NAME.to_s
  end

  def clone_for_next_occurence
    is_self_dev_routine = self.task_type == "self_development"
    # Clone the task
    new_task = self.dup
    if is_self_dev_routine
      new_task.description = ""
    end
    # AI generated feedback is done via the comment field. (Well that's the plan anyway!)
    new_task.comment = ""
    new_task.completed = false

    # Set the new task to the next occurence
    # Need to work out when the next occurence is...
    new_task.start_date = self.find_next_occurence
    # raise "Next occurence is #{new_task.start_date}"

    # Save the newly cloned task
    new_task.save!
    self.subtasks.each do |subtask|
      new_subtask = subtask.dup
      new_subtask.task = new_task
      new_subtask.completed = false
      # Users input i.e. their log/journaling etc. is done via the description field
      if is_self_dev_routine
        new_subtask.description = ""
      end
      # AI generated feedback is done via the comment field.
      new_subtask.comment = ""
      new_subtask.save!
    end
  end

  def self.transform_routines_for_html_select
    self.routines.each_with_object({}) { |(item, index), r| r[item.gsub("_", " ").titleize] = item }
  end

  def self.transform_task_types_for_html_select
    self.task_types.each_with_object({}) { |(item, index), t| t[item.gsub("_", " ").titleize] = item }
  end

  private

  def set_default_start_date
    self.start_date = Time.now
  end

  def find_next_occurence
    # Need to work out when the next occurence is...
    today = Time.now
    next_occurence = today
    7.times do |i|
      j = i + 1
      the_date = today + j.day
      this_day = eval("self.#{(the_date).strftime("%A").downcase}")
      if this_day.class == String && this_day == "1" || this_day.class == Integer && this_day == 1
        return the_date
      end
    end
  end

  # Will return the highest order number for the task
  # If no tasks exist for the user and routine, will return 1
  def set_initial_order
    # Think we will need to revisit when we start working on the journal
    #   logs i.e. daily log, etc. with different days...
    count = Task.where(user_id: self.user_id, routine: self.routine).maximum(:order)
    self.order = count.nil? ? 1 : count + 1
  end
end
