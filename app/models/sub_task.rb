class SubTask < ApplicationRecord
  belongs_to :task
  after_initialize do |sub_task|
    if !sub_task.persisted?
      set_initial_order
    end
  end

  def set_initial_order
    if !self.task.nil?
      self.task.sub_tasks.count + 1
    end
  end
end
