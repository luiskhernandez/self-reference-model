class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.references :parent, index: true
      t.string  :definition, null: false
      t.boolean :truthy

      t.timestamps null: false
    end
  end
end
