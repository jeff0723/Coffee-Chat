import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CoffeChatIntialize, Transfer,
} from "../generated/CoffeeChat/CoffeeChat"
import { ExampleEntity, CoffeeChat } from "../generated/schema"

const ZERO_ADDERSS = Address.zero()

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
  coffeeChat.isActive = true
  coffeeChat.save()
}

export function handleCoffeeChatClose(event: Transfer): void {
  // if burn the token, remain data but set isActive = false
  if (event.params.to.equals(ZERO_ADDERSS)) {
    let coffeeChat = CoffeeChat.load(event.params.tokenId.toString())
    if (coffeeChat) {
      coffeeChat.isActive = false
      coffeeChat.save()
    }
  }
}
