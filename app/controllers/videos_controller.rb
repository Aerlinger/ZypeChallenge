class VideosController < ApplicationController
  # Display all videos
  def index
  end

  # Display individual video
  def show
    @_id = params[:id]
  end
end
