class Api::MessagesController < ApplicationController
  def index
    @meesages = Message.where("id > ?", params[:message][:id])
    respond_to do |format|
      format.json
    end
  end
end