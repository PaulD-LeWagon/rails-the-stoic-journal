class Task < ApplicationRecord
  belongs_to :user
  has_many :sub_tasks, inverse_of: :task, dependent: :destroy

  accepts_nested_attributes_for :sub_tasks, reject_if: :all_blank, allow_destroy: true

  after_initialize do |task|
    if !persisted?
      set_initial_order
    end
  end

  NONE_ROUTINE_NAME = :not_recuring

  enum routine: [ NONE_ROUTINE_NAME, :morning, :day, :evening ]
  enum task_type: [ :general, :event, :fitness, :admin, :work, :self_development ]

  default_scope { order(:order) }

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }
  scope :filter_by_user_routines, ->(user, routine) { where('user_id = ? AND routine = ?', user.id, routines[routine]) }

  validates_presence_of :title
  # validates_date_of :start_date, before: :due_date, message: "Must be before 'Due Date!'"
  # validates_date_of :start_date, after_or_equal_to: Time.now, message: "Valid 'Start Date' must be from today onwards!"

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
