class Routine < ApplicationRecord
  belongs_to :task
  enum type: [ :no_routine, :morning, :day, :evening ]

  def self.transform_types_for_html_select
    self.types.each_with_object({}) { |(item, index), r| r[item.gsub('_', ' ').titleize] = item }
  end
end
