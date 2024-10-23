module ApplicationHelper
#   # Usage
#   with_format :html do
#     @the_form = render_to_string partial: 'tasks/form', :locals => { :task => @task }
#   end
#   render :json => { :form => @the_form, :status => "success", :message => "Form ready to be edited." }
  def with_format(format, &block)
    old_formats = formats
    self.formats = [format]
    block.call
    self.formats = old_formats
    nil
  end
end
