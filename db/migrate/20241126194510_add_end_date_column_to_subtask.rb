class AddEndDateColumnToSubtask < ActiveRecord::Migration[7.1]
  def change
    add_column :subtasks, :end_date, :datetime
  end
end
