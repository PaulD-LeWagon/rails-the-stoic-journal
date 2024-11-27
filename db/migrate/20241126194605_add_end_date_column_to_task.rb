class AddEndDateColumnToTask < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :end_date, :datetime
  end
end
