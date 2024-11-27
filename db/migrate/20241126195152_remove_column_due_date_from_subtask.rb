class RemoveColumnDueDateFromSubtask < ActiveRecord::Migration[7.1]
  def change
    remove_column :subtasks, :due_date, :datetime
  end
end
