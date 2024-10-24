class Subtask < ApplicationRecord
  belongs_to :task, inverse_of: :subtasks

  after_initialize do |subtask|
    if !subtask.persisted?
      set_initial_order
    end
  end

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }

  default_scope { order(:task_id, :order) }

  def set_initial_order
    if !self.task.nil?
      self.task.subtasks.count + 1
    end
  end

  validates_presence_of :title
end
