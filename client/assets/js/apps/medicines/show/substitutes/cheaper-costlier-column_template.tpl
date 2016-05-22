<span class="<%if(difference>=0){%>text-success<%}else{%>text-danger<%}%>">
<%if(difference>=0){%>
<span><%=difference%>% </span>
<%}else{%>
<span><%=(-1)*difference%>% </span>
<%}%>
<i class="fa <%if(difference>=0){%>fa-thumbs-up<%}else{%>fa-thumbs-down<%}%>"></i></span>