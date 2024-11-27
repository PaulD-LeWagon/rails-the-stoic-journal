class AddDurationColumnToSubtask < ActiveRecord::Migration[7.1]
  def change
    add_column :subtasks, :duration, :string, default: "PT15M"
  end
end
