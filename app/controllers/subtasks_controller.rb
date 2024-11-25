class SubtasksController < ApplicationController
  before_action :set_task
  before_action :set_subtask, only: %i[ show edit update destroy ]

  def index
    @subtasks = policy_scope(Subtask)
  end

  def show
    authorize @subtask
  end

  def new
    # @task = Task.find(params[:task_id])
    @subtask = Subtask.new(task: @task)
    authorize @subtask
  end

  def create
    @subtask = Subtask.new(subtask_params)
    @subtask.task = @task
    authorize @subtask
    if @subtask.save
      path = @task.routine? ? tasks_path(routine: @task.routine) : tasks_path
      redirect_to path, notice: "Sub task successfully created.", status: :see_other
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    authorize @subtask
    if request.headers["Content-Type"] == "application/json" || request.headers["Accept"] == "application/json"
      render json: {
               form: render_to_string(partial: "subtasks/form", formats: [:html], locals: { task: @task, subtask: @subtask }),
               status: "success",
               message: "Form ready to be edited.",
             }
    else
      render :edit, task: @task, subtask: @subtask, notice: "Subtask, #{@subtask.title} ready for editing!", status: :see_other
    end
  end

  def update
    authorize @subtask
    respond_to do |format|
      if @subtask.update!(subtask_params)
        path = @task.routine? ? tasks_path(routine: @task.routine) : tasks_path
        format.html { redirect_to path, notice: "Sub task #{@subtask.title} successfully updated.", status: :see_other }
        format.json do
          resp = {
            status: "success",
            task: @subtask,
            errors: "",
            message: "Sub-task, #{@subtask.title}, updated!",
          }
          render json: resp.to_json, notice: "Sub-task, #{@subtask.title} updated!", status: :ok
        end
      else
        format.html { render :edit, alert: "Server error", status: :unprocessable_entity }
        format.json do
          resp = {
            status: "error",
            task: @subtask,
            errors: @subtask.errors,
            message: "Sub-task #{@subtask.title} NOT updated!",
          }
          render json: resp.to_json, alert: "Error subtask could not be updated", status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    authorize @subtask
    @subtask.destroy
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to tasks_url, notice: "Sub task #{@subtask.title} was successfully destroyed.", status: :see_other }
    end
  end

  private

  def set_task
    @task = Task.find(params[:task_id])
  end

  def set_subtask
    @subtask = @task.subtasks.find(params[:id])
  end

  def subtask_params
    params.require(:subtask).permit(
      :id,
      :order,
      :title,
      :description,
      :comment,
      :start_date,
      :due_date,
      :completed,
      :task_id
    )
  end
end
