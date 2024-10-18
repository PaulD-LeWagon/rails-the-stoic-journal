class RegistrationsController < Devise::RegistrationsController
  private
  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end

  def update_params
    params.require(:user).permit(:photo, :email, :password, :password_confirmation, :first_name, :last_name, :bio)
  end
end
