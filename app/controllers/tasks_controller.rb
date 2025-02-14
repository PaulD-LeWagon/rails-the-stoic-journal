class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]
  before_action :set_dynamic_routine_turbo_frame_id, except: %i[ edit update ]

  def index
    if has_valid_routine?
      @tasks = policy_scope(Task).where(user: current_user, routine: params[:routine])
    else
      @tasks = policy_scope(Task).where(user: current_user, routine: Task::NONE_ROUTINE_NAME)
    end
  end

  def show
    authorize @task
  end

  def new
    if has_valid_routine?
      routine = params[:routine].is_a?(Array) ? Task::NONE_ROUTINE_NAME : params[:routine].to_sym
      @task = Task.new(routine: routine, user: current_user)
    else
      @task = Task.new(user: current_user)
      # Not needed as the form will create the subtasks via + <button>
      # @task.subtasks.build
    end
    authorize @task
  end

  def create
    @task = Task.new(task_params)
    @task.user = current_user
    authorize @task
    respond_to do |format|
      if @task.save
        if (request.referer.include?("log"))
          path = request.referer
        else
          path = @task.routine? ? tasks_path(routine: @task.routine) : tasks_path
        end
        format.html { redirect_to path, notice: "Task, #{@task.title}, created successfully with #{@task.subtasks.count} sub tasks!", status: :see_other }
        format.json do
          resp = {
            status: "success",
            task: @task,
            errors: "",
            message: "Task, #{@task.title}, created successfully with #{@task.subtasks.count} sub tasks!",
          }
          render json: resp.to_json, notice: "Task, #{@task.title}, created successfully with #{@task.subtasks.count} sub tasks!", status: :see_other # :ok for AJAX when needed
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

  def edit
    authorize @task
    if request.headers["Content-Type"] == "application/json" || request.headers["Accept"] == "application/json"
      render json: {
        form: render_to_string(partial: "tasks/form", formats: [:html], locals: { task: @task }),
        status: "success",
        message: "Form ready to be edited.",
      }
    else
      render :edit, task: @task, notice: "Task, #{@task.title}, with #{@task.subtasks.count} sub tasks ready for updating!", status: :see_other
    end
  end

  def update
    authorize @task
    respond_to do |format|
      if @task.update(task_params)
        # Check for routines and if so, are they completed?
        # If completed, clone for the next occurence
        if @task.routine? && @task.completed? && @task.active?
          @task.clone_for_next_occurence
          @task.active = false
          @task.save!
        end
        path = @task.routine? ? tasks_path(routine: @task.routine) : tasks_path
        format.html { redirect_to path, notice: "Task, #{@task.title}, updated successfully with #{@task.subtasks.count} sub tasks!", status: :see_other }
        format.json do
          resp = {
            status: "success",
            task: @task,
            errors: "",
            message: "Task, #{@task.title}, successfully updated with #{@task.subtasks.count} sub tasks!",
          }
          render json: resp.to_json, notice: "Task, #{@task.title}, successfully updated with #{@task.subtasks.count} sub tasks!", status: :ok # :ok for AJAX
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
    @task.subtasks.destroy_all
    @task.destroy
    respond_to do |format|
      format.turbo_stream
      url = @task.routine? ? tasks_url(routine: @task.routine) : tasks_url
      format.html { redirect_to url, notice: "Task #{title} deleted!", status: :see_other }
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(
      :routine,
      :monday,
      :tuesday,
      :wednesday,
      :thursday,
      :friday,
      :saturday,
      :sunday,
      :task_type,
      :title,
      :description,
      :comment,
      :ai_feedback,
      :start_date,
      :duration,
      :end_date,
      :completed,
      :active,
      subtasks_attributes: [
        :id,
        :order,
        :title,
        :description,
        :comment,
        :ai_feedback,
        :duration,
        :end_date,
        :start_date,
        :due_date,
        :completed,
        :_destroy,
      ],
    )
  end

  def has_valid_routine?
    if defined?(params[:routine])
      routine = params[:routine]
      routine.is_a?(Array) ? (Task.routines.keys & routine).any? : Task.routines.include?(routine)
    else
      false
    end
  end

  def set_dynamic_routine_turbo_frame_id
    routine = params[:routine]
    routine_name = routine.is_a?(Array) ? "non_recuring" : routine
    @turbo_frame_id = has_valid_routine? ? "new_#{routine_name}_routine_turbo_frame" : "new_task_turbo_frame"
  end
end
