class Task < ApplicationRecord
  belongs_to :user
  enum routine: [ :false, :morning, :day, :evening ]
  enum task_type: [ :event, :task, :fitness, :admin, :work, :self_development ]
end
