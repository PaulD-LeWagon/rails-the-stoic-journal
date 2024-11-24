class RemoveOrderColumnFromTask < ActiveRecord::Migration[7.1]
  def change
    remove_column :tasks, :order, :integer
  end
end
