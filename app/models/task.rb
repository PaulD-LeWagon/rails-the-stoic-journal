class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks, inverse_of: :task, dependent: :destroy

  accepts_nested_attributes_for :subtasks, reject_if: proc { |attributes| attributes["title"].blank? || attributes["_destroy"] == "1" }, allow_destroy: true

  after_initialize :set_default_start_date, :if => :new_record?

  before_save :set_initial_order, :if => :new_record?

  NONE_ROUTINE_NAME = :not_recuring

  enum routine: [NONE_ROUTINE_NAME, :morning, :day, :evening]
  enum task_type: [:general, :event, :fitness, :admin, :work, :self_development]

  default_scope { order(:order) }

  scope :completed, -> { where(completed: true) }
  scope :pending, -> { where(completed: false) }
  scope :filter_by_user_routines, ->(user, routine) { where("user_id = ? AND routine = ?", user.id, routines[routine]) }

  validates_presence_of :title
  validates :user_id, presence: true

  # validates_date_of :start_date, before: :due_date, message: "Must be before 'Due Date!'"
  # validates_date_of :start_date, after_or_equal_to: Time.now, message: "Valid 'Start Date' must be from today onwards!"

  def routine?
    self.routine != NONE_ROUTINE_NAME.to_s
  end

  def self.transform_routines_for_html_select
    self.routines.each_with_object({}) { |(item, index), r| r[item.gsub("_", " ").titleize] = item }
  end

  def self.transform_task_types_for_html_select
    self.task_types.each_with_object({}) { |(item, index), t| t[item.gsub("_", " ").titleize] = item }
  end

  private

  def set_default_start_date
    self.start_date = Time.now
  end

  def set_initial_order
    count = Task.where(user_id: self.user_id, routine: self.routine).maximum(:order)
    self.order = count.nil? ? 1 : count + 1
  end
end
