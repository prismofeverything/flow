{:port 11235
 :kafka
 {:host "localhost:9092"
  :group-id "flow"
  :send "flow-events"
  :subscribe ["flow-events"]
  :topics {:flow-events "flow-events"}}}
