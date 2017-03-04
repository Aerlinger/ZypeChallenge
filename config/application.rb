require_relative 'boot'

require 'rails'

# NOTE: We're not using ActiveRecord, ActiveJob, ActionCable, or TestUnit here
%w(
  action_mailer/railtie
  action_controller/railtie
  action_view/railtie
  sprockets/railtie
).each do |railtie|
  begin
    require railtie
  rescue LoadError
  end
end

# Require the gems listed in Gemfile, including any gems
Bundler.require(*Rails.groups)

module ZypeChallenge
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
