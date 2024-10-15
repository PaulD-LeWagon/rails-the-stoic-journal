class Task < ApplicationRecord
  belongs_to :user
  has_many :sub_tasks
  enum routine: [ :no_routine, :morning, :day, :evening ]
  enum task_type: [ :general, :event, :fitness, :admin, :work, :self_development ]

  def routine?
    self.routine != "no_routine"
  end

  def self.transform_routines_for_html_select
    self.routines.each_with_object({}) { |(item, index), r| r[item.gsub('_', ' ').titleize] = item }
  end

  def self.transform_task_types_for_html_select
    self.task_types.each_with_object({}) { |(item, index), t| t[item.gsub('_', ' ').titleize] = item }
  end
end
