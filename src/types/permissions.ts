export enum TPermissions {
  // files
  ReadSignedFileUrl = "readSignedFileUrl",
  ReadSignedUploadUrl = "readSignedUploadUrl",
  CheckFileExists = "checkFileExists",
  // form submission
  CreateFormSubmission = "createFormSubmission",
  UpdateFormSubmission = "updateFormSubmission",
  ReadFormSubmissions = "readFormSubmissions",
  // equipment
  ReadEquipment = "readEquipment",
  // inventory
  ReadInventory = "readInventory",
  // inventory delivery
  CreateInventoryDelivery = "createInventoryDelivery",
  ReadInventoryDeliveries = "readInventoryDeliveries",
  // inventory item batch
  CreateInventoryItemBatch = "createInventoryItemBatch",
  UpdateInventoryItemBatch = "updateInventoryItemBatch",
  ReadInventoryItemBatches = "readInventoryItemBatches",
  // inventory reading
  CreateInventoryReading = "createInventoryReading",
  UpdateInventoryReading = "updateInventoryReading",
  ReadInventoryReadings = "readInventoryReadings",
  // stocktake
  CreateStockCounts = "createStockCounts",
  CreateStocktake = "createStocktake",
  DeleteStocktake = "deleteStocktake",
  // checklist module
  ReadActions = "readActions",
  CreateTask = "createTask",
  CreateTasks = "createTasks",
  UpdateTask = "updateTask",
  UpdateTasks = "updateTasks",
  CreateAction = "createAction",
  UpdateAction = "updateAction",
  ReadTaskChecklist = "readTaskChecklist",
  ReadTaskSummaries = "readTaskSummaries",
  ReadTasks = "readTasks",
  // network screen
  ViewMyNetwork = "viewMyNetwork",
  ViewCourses = "viewCourses",
  // news
  ReadNews = "readNews",

  ReadOpsArticles = "readOpsArticles",
  ReadOpsArticle = "readOpsArticle",
  // ops resources
  ReadOpsResources = "readOpsResources",
  SystemAdmin = "systemAdmin",
  // next
  AssignMedicalResources = "assignMedicalResources",
  AssignCompanions = "assignCompanions",
  AssignRooms = "assignRooms",

  // big retail
  UpdateRetailLocationOrderingStatus = "updateRetailLocationOrderingStatus",
  ReadSalesOrders = "readSalesOrders",
  RefundSalesOrder = "refundSalesOrder",
  UpdateSalesOrder = "updateSalesOrder",
  PrintSalesOrder = "printSalesOrder",

  // EHR specific routes
  EhrStaffOnly = "ehrStaffOnly",
}
