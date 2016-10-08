class ItemsController < ApplicationController
  def index
    load_items
  end

  def show
    load_item
  end

  def new
    build_item
  end

  def create
    build_item
    save_item or render :new
  end

  def edit
    load_item
    build_item
  end

  def update
    load_item
    build_item
    save_item or render :edit
  end

  def destroy
    load_item
    @item.destroy
    flash[:notice] = "Item deleted successfuly"
    redirect_to items_path
  end

  private
  def load_items
    @q = items_scope.ransack(params[:q])
    @items ||= @q.result(distinct: true).paginate(page: params[:page])
  end

  def load_item
    @item ||= items_scope.find(params[:id])
  end

  def build_item
    @item ||= items_scope.build
    @item.attributes = item_params
  end

  def build_children
    2.times { @item.children.build } if @item
  end

  def save_item
    if @item.save
      flash[:notice] = "Person saved successfuly"
      redirect_to root_path
    else
      flash[:error] = @item.errors.full_messages.to_sentence
      false
    end
  end

  def item_params
    item_params = params[:item]
    item_params ? item_params.permit(:definition, :truthy, children_attributes: [:id , :definition, :truthy, :destroy]) :  {}
  end

  def children_attributes
    {children_attributes: [:id , :definition, :truthy, :destroy ] }
  end

  def items_scope
    Item.where(parent: nil).all
  end
end
