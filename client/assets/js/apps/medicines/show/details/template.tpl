<span class="details-item col-sm-6"><span class='tag'>Brand:</span>
<%= medicine.brand %>
    </span>
    <span class="details-item col-sm-6"><span class='tag'>Manufacturer:</span>
    <%= medicine.manufacturer %>
        </span>
        <span class="details-item col-sm-6"><span class='tag'>Price:</span>
        <i class="fa fa-inr"></i>
        <%= medicine.package_price %>
            </span>
            <span class="details-item col-sm-6"><span class='tag'>Package Quantity:</span>
            <%= medicine.package_qty %>
                </span>
                <div class="details-item col-sm-12">
                    <span class='tag'>Constituents(Strength):&nbsp;</span>
                    <div class='constituents'>
                        <%=constituents.map(function(item){return "<span class='constituent'>"+item.name.trim()+"("+item.strength.trim()+")</span>";}).join("") %></div>
                </div>