require 'rails_helper'

describe "DeviceController" do
  let(:group) { create(:group) }
  let(:user) { create(:user) }


  describe "GET #index" do

    context "login" do 

      it "" do
        expect().to eq messages
      end


      it "redners index" do
        expect(response).to render_template :index
      end

    end

    context "logout" do 

      it "" do
        redirect_to root_path
      end

    end

  end

end