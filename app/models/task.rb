class Task < ApplicationRecord
  belongs_to :user
  has_many :sub_tasks
  after_initialize do |task|
    if !task.persisted?
      set_initial_order
    end
  end

  none_routine_name = :not_recuring

  enum routine: [ none_routine_name, :morning, :day, :evening ]
  enum task_type: [ :general, :event, :fitness, :admin, :work, :self_development ]

  def routine?
    self.routine != none_routine_name.to_s
  end

  def default_subtask_order
    set_initial_order
  end

  def self.transform_routines_for_html_select
    self.routines.each_with_object({}) { |(item, index), r| r[item.gsub('_', ' ').titleize] = item }
  end

  def self.transform_task_types_for_html_select
    self.task_types.each_with_object({}) { |(item, index), t| t[item.gsub('_', ' ').titleize] = item }
  end

  private

    def set_initial_order
      self.order = Task.count + 1
    end
end
