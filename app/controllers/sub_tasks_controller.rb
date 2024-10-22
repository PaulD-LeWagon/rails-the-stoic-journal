class SubTasksController < ApplicationController
  before_action :set_task
  before_action :set_sub_task, only: %i[ show edit update destroy ]

  def index
    @sub_tasks = policy_scope(SubTask)
  end

  def show
    authorize @sub_task
  end

  def new
    # @task = Task.find(params[:task_id])
    @sub_task = SubTask.new(task: @task)
    authorize @sub_task
  end

  def edit
    authorize @sub_task
  end

  def create
    @sub_task = SubTask.new(sub_task_params)
    @sub_task.task = @task
    authorize @sub_task
    if @sub_task.save
      redirect_to tasks_path, notice: "Sub task successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    authorize @sub_task
    if @sub_task.update(sub_task_params)
      redirect_to tasks_path, notice: "Sub task #{@sub_task.title} successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @sub_task
    @sub_task.destroy
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to tasks_url, notice: "Sub task #{@sub_task.title} was successfully destroyed.", status: :see_other }
    end
  end

  private

  def set_task
    @task = Task.find(params[:task_id])
  end

  def set_sub_task
    @sub_task = @task.sub_tasks.find(params[:id])
  end

  def sub_task_params
    params.require(:sub_task).permit(
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
