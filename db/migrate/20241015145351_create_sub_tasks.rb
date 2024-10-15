class CreateSubTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :sub_tasks do |t|
      t.references :task, null: false, foreign_key: true
      t.integer :order
      t.string :title
      t.text :description
      t.text :comment
      t.datetime :start_date
      t.datetime :due_date
      t.boolean :completed

      t.timestamps
    end
  end
end
