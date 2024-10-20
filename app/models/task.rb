class Task < ApplicationRecord
  belongs_to :user
  has_many :sub_tasks

  after_initialize do |task|
    if !persisted?
      set_initial_order
    end
  end

  NONE_ROUTINE_NAME = :not_recuring

  enum routine: [ NONE_ROUTINE_NAME, :morning, :day, :evening ]
  enum task_type: [ :general, :event, :fitness, :admin, :work, :self_development ]

  def routine?
    self.routine != NONE_ROUTINE_NAME.to_s
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
