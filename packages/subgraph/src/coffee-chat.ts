import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CoffeeChatIntialize, CoffeeChatRedeem, Transfer, CoffeeChatRate,
} from "../generated/CoffeeChat/CoffeeChat"
import { ExampleEntity, CoffeeChat } from "../generated/schema"

const ZERO_ADDERSS = Address.zero()

export function handleCoffeeChatIntialize(event: CoffeeChatIntialize): void {
  let coffeeChat = CoffeeChat.load(event.params.chatId.toString())
  if (!coffeeChat) {
    coffeeChat = new CoffeeChat(event.params.chatId.toString())
  }
  coffeeChat.placeId = event.params.placeId
  coffeeChat.startTime = event.params.startTime
  coffeeChat.endTime = event.params.endTime
  coffeeChat.lantitude = event.params.lantitude
  coffeeChat.longtitude = event.params.longtitude
  coffeeChat.stakeAmount = event.params.stakeAmount
  coffeeChat.initializer = event.params.initializer
  coffeeChat.metadataURI = event.params.metadataURI
  coffeeChat.redeemer = ZERO_ADDERSS
  coffeeChat.points = -1
  coffeeChat.isActive = true
  coffeeChat.save()
}

export function handleCoffeeChatRedeem(event: CoffeeChatRedeem): void {
  // if redeem, set redeemer
  let coffeeChat = CoffeeChat.load(event.params.chatId.toString())
  if (coffeeChat) {
    coffeeChat.redeemer = event.params.redeemer
    coffeeChat.save()
  }
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

export function handleCoffeeChatRate(event: CoffeeChatRate): void {
  // if redeemer rate, set points
  let coffeeChat = CoffeeChat.load(event.params.chatId.toString())
  if (coffeeChat) {
    coffeeChat.points = event.params.points
    coffeeChat.save()
  }
}