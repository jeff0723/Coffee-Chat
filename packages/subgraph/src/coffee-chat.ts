import { BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged, CoffeChatIntialize
} from "../generated/CoffeeChat/CoffeeChat"
import { ExampleEntity, CoffeeChat } from "../generated/schema"

export function handleCoffeChatIntialize(event: CoffeChatIntialize): void {
  let coffeeChat = CoffeeChat.load(event.params.tokenId.toString())
  if (!coffeeChat) {
    coffeeChat = new CoffeeChat(event.params.tokenId.toString())
  }
  coffeeChat.placeId = event.params.placeId
  coffeeChat.startTime = event.params.startTime
  coffeeChat.endTime = event.params.endTime
  coffeeChat.lantitude = event.params.lantitude
  coffeeChat.longtitude = event.params.longtitude
  coffeeChat.stakeAmount = event.params.stakeAmount
  coffeeChat.initializer = event.params.initializer
  coffeeChat.save()
}

