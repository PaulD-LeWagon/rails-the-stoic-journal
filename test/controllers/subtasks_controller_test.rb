require "test_helper"

class SubtasksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get subtasks_index_url
    assert_response :success
  end

  test "should get show" do
    get subtasks_show_url
    assert_response :success
  end

  test "should get new" do
    get subtasks_new_url
    assert_response :success
  end

  test "should get create" do
    get subtasks_create_url
    assert_response :success
  end

  test "should get edit" do
    get subtasks_edit_url
    assert_response :success
  end

  test "should get update" do
    get subtasks_update_url
    assert_response :success
  end
end
