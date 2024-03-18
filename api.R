library(plumber)
library(RSQLite)

conn <- dbConnect(RSQLite::SQLite(), "sinh_vien.db")



#* @apiTitle Plumber API


#* Send data
#* @get /df
function() {
  df <- dbGetQuery(conn, "SELECT * FROM sinh_vien")
  df
}


#* Add hoc_sinh to db
#* @param ma_sv
#* @param ho_ten
#* @param email
#* @param ngay_sinh
#* @param que
#* @param diem_tong_ket
#* @post /add
function(ma_sv, ho_ten, email, ngay_sinh, que, diem_tong_ket){
  query = paste0("INSERT INTO sinh_vien (ma_sv, ho_ten, email, ngay_sinh, que, diem_tong_ket) 
                 VALUES (", as.character(ma_sv), 
                 ", '", ho_ten, 
                 "', '", email, 
                 "', '", ngay_sinh,
                 "', '", que,
                 "', ", as.character(diem_tong_ket),
                 ")")

  dbExecute(conn, query)
  
  list(status = "Add Successfully")
}


#* Delete hoc_sinh theo ma_sv
#* @param ma_sv
#* @delete /delete
function(ma_sv){
  query = paste0("DELETE FROM sinh_vien WHERE ma_sv=",ma_sv)
  dbExecute(conn, query)
  list(status = "Delete Successfully")
}


#* Update theo ma_sv
#* @param ma_sv
#* @param ho_ten
#* @param email
#* @param ngay_sinh
#* @param que
#* @param diem_tong_ket
#* @put /update
function(ma_sv, ho_ten, email, ngay_sinh, que, diem_tong_ket){
  query = paste0("UPDATE sinh_vien
                 SET ho_ten = '", ho_ten, "', 
                     email = '", email, "',
                     ngay_sinh = '", ngay_sinh, "',
                     que = '", que, "',
                     diem_tong_ket = ", diem_tong_ket, "
                 WHERE ma_sv = ",ma_sv)
  dbExecute(conn, query)
  list(status = "Update Successfully")
}


#' @get /data_csv
#' @serializer csv
function() {
  df <- dbGetQuery(conn, "SELECT * FROM sinh_vien")
  
  as_attachment(df, "sinh_vien.csv")
}


library(XML)

df_to_xml <- function(df, root_name = "data", row_name = "row") {
  xml_data <- newXMLDoc()
  
  root_node <- newXMLNode(root_name, doc = xml_data)
  
  for (i in 1:nrow(df)) {
    row_node <- newXMLNode(row_name, parent = root_node)
    for (j in 1:ncol(df)) {
      newXMLNode(names(df)[j], as.character(df[i, j]), parent = row_node)
    }
  }
  
  return(xml_data)
}


#* @serializer contentType list(type="application/xml")
#* @get /data_xml
function(){
  df <- dbGetQuery(conn, "SELECT * FROM sinh_vien")
  
  # Convert data frame to XML
  xml_data <- df_to_xml(df)
  
  # Convert XML to character string
  xml_str <- capture.output(xml_data)
  
  return(xml_data)
}




#' @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
  
}
