class ChangeDefaultValueforRoutineTo0InTasks < ActiveRecord::Migration[7.1]
  def change
    change_column_default :tasks, :routine, from: nil, to: 0
  end
end
