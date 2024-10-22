class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]

  def index
    @tasks = policy_scope(Task)
  end

  def show
    authorize @task
  end

  def new
    @task = Task.new
    @task.user = current_user
    @task.sub_tasks.build
    authorize @task
  end

  def edit
    authorize @task
  end

  def create
    @task = Task.new(task_params)
    @task.user = current_user
    authorize @task
    respond_to do |format|
      if @task.save
        format.html { redirect_to tasks_path, notice: "Task, #{@task.title}, created successfully with #{@task.sub_tasks.count} sub tasks!", status: :see_other }
        format.json do
          resp = {
            status: "success",
            task: @task,
            errors: "",
            message: "Task, #{@task.title}, created successfully with #{@task.sub_tasks.count} sub tasks!",
          }
          render json: resp.to_json, notice: "Task, #{@task.title}, created successfully with #{@task.sub_tasks.count} sub tasks!", status: :see_other
        end
      else
        format.html { render :new, alert: "Could not create task #{@task.title}", status: :unprocessable_entity }
        format.json do
          resp = {
            status: "error",
            task: @task,
            errors: @task.errors,
            message: "Task NOT created!",
          }
          render json: resp.to_json, alert: "Could not create task #{@task.title}", status: :unprocessable_entity
        end
      end
    end
  end

  def update
    authorize @task
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to tasks_path, notice: "Task, #{@task.title}, updated successfully with #{@task.sub_tasks.count} sub tasks!", status: :see_other }
        format.json do
          resp = {
            status: "success",
            task: @task,
            errors: "",
            message: "Task, #{@task.title}, successfully updated with #{@task.sub_tasks.count} sub tasks!",
          }
          render json: resp.to_json, notice: "Task, #{@task.title}, successfully updated with #{@task.sub_tasks.count} sub tasks!", status: :see_other
        end
      else
        format.html { render :edit, alert: "Server error", status: :unprocessable_entity }
        format.json do
          resp = {
            status: "error",
            task: @task,
            errors: @task.errors,
            message: "Task #{@task.title} NOT updated!",
          }
          render json: resp.to_json, alert: "Error task could not be updated", status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    authorize @task
    title = @task.title
    @task.sub_tasks.destroy_all
    @task.destroy
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to tasks_url, notice: "Task #{title} deleted!", status: :see_other }
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(
      :order,
      :routine,
      :recurs_on,
      :task_type,
      :title,
      :description,
      :comment,
      :start_date,
      :due_date,
      :completed,
      :active,
      sub_tasks_attributes: [
        :id,
        :order,
        :title,
        :description,
        :comment,
        :start_date,
        :due_date,
        :completed,
        :_destroy
      ])
  end
end
