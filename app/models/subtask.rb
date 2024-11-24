class Subtask < ApplicationRecord
  belongs_to :task, inverse_of: :subtasks

  before_save :set_initial_order, if: :new_record?

  before_validation do |subtask|
    subtask.order = subtask.order.to_i
  end

  # default_scope -> { order(:order) }

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }

  def set_initial_order
    count = self.task.subtasks.maximum(:order)
    self.order = count.nil? ? 1 : count + 1
  end

  validates :title, presence: true
end
