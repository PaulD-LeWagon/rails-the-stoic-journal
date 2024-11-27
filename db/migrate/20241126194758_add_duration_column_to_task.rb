class AddDurationColumnToTask < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :duration, :string, default: "PT30M"
  end
end
