class Subtask < ApplicationRecord
  belongs_to :task, inverse_of: :subtasks

  after_initialize do |subtask|
    if !subtask.persisted? || order == 0
      set_initial_order
    end
  end

  before_save do |subtask|

  end

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }

  default_scope { order(:created_at) }

  def set_initial_order
    if !self.task.nil?
      self.task.subtasks.count + 1
    end
  end
  # validates :title, presence: true
end
