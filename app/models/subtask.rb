class Subtask < ApplicationRecord
  belongs_to :task, inverse_of: :subtasks

  attribute :duration, :duration

  before_save :set_initial_order, if: :new_record?
  before_save :set_date_from_duration, if: :new_record?

  before_validation do |subtask|
    subtask.order = subtask.order.to_i
  end

  default_scope -> { order(:order) }

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }

  def set_initial_order
    count = self.task.subtasks.maximum(:order)
    self.order = count.nil? ? 1 : count + 1
  end

  def duration_to_hms
    sec = self.duration.to_i
    "%02d:%02d:%02d" % [sec / 3600, sec / 60 % 60, sec % 60]
  end

  def hms_to_duration
    p self.duration
    if /^\d{2}:\d{2}:\d{2}?$/.match(self.duration.to_s)
      self.duration = ActiveSupport::Duration.build(self.duration.split(":").map(&:to_i).inject(0) { |a, b| a * 60 + b })
    end
    p duration
  end

  def set_date_from_duration
    neo_var = ""
    parent_task = self.task
    if parent_task.subtasks.length == 1
      # I am (The Alpha & Omega!) the first subtask
      self.start_date = parent_task.start_date
    elsif parent_task.subtasks.length > 1
      # I am not the first... No, I'am Neo!
      previous_subtask = parent_task.subtasks[-2]
      my_start_date = previous_subtask.start_date + previous_subtask.duration if previous_subtask.start_date?
      self.start_date = my_start_date
    end
  end

  validates :title, :duration, presence: true
end
