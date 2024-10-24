class SubTask < ApplicationRecord
  belongs_to :task, inverse_of: :sub_tasks

  after_initialize do |sub_task|
    if !sub_task.persisted?
      set_initial_order
    end
  end

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }

  default_scope { order(:task_id, :order) }

  def set_initial_order
    if !self.task.nil?
      self.task.sub_tasks.count + 1
    end
  end

  validates_presence_of :title
end
