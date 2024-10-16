require "test_helper"

class SubTasksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sub_tasks_index_url
    assert_response :success
  end

  test "should get show" do
    get sub_tasks_show_url
    assert_response :success
  end

  test "should get new" do
    get sub_tasks_new_url
    assert_response :success
  end

  test "should get create" do
    get sub_tasks_create_url
    assert_response :success
  end

  test "should get edit" do
    get sub_tasks_edit_url
    assert_response :success
  end

  test "should get update" do
    get sub_tasks_update_url
    assert_response :success
  end
end
