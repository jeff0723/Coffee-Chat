import React, { useReducer } from 'react'
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { Dialog, Transition } from "@headlessui/react";
import { Domain } from "domain";
import { CoffeeOutlined, CameraOutlined, StarOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd';
import CoffeeChatList from './CoffeeChatList';
import ScanQrcodeModal from './ScanQrcodeModal';
import { useMediaQuery } from 'react-responsive'
import RatingModal from './RatingModal';
import { event } from 'nextjs-google-analytics';
import { useAccount } from 'wagmi';
import clsx from 'clsx'

type Props = {}
const OptionButton = (props: Props) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 475px)'
    })
    const [optionShow, setOptionShow] = useState(false)
    const [coffeeChatListModalOpen, toggleCoffeeChatList] = useReducer(state => !state, false)
    const [cameraOpen, toggleCamera] = useReducer(state => !state, false)
    const [ratingOpen, toggleRating] = useReducer(state => !state, false)
    const { address } = useAccount()
    return (
        <div className={
            clsx({
                "left-5 bottom-5": !isMobile,
                "left-2 bottom-2": isMobile,
            },
                "absolute flex flex-col gap-2 ")

        }>
            <Transition appear show={optionShow} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { setOptionShow(false) }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white bg-opacity-40" onClick={() => { setOptionShow(false) }} />
                    </Transition.Child>
                </Dialog>
            </Transition>

            <Transition appear show={optionShow} as={Fragment}>


                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="flex flex-col gap-2 z-20 mb-24">
                        <div className="ml-8 flex gap-2  items-center pr-2">
                            <Tooltip title="Open camera">
                                <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center hover:bg-opacity-90"
                                    onClick={() => {
                                        event("camera_btn_click", {
                                            category: "Action",
                                            label: address
                                        })
                                        toggleCamera()
                                    }}>
                                    <CameraOutlined />

                                </div>
                            </Tooltip>
                        </div>
                        <div className="ml-8 flex gap-2 items-center pr-2">
                            <Tooltip title="Rate your chat">
                                <div className="w-10 h-10 bg-white  rounded-full flex justify-center items-center hover:bg-opacity-90"
                                    onClick={() => {
                                        event("rating_btn_click", {
                                            category: "Action",
                                            label: address
                                        })
                                        toggleRating()
                                    }}>
                                    <StarOutlined />
                                </div>
                            </Tooltip>
                        </div>
                        <div className="ml-8 flex gap-2 items-center pr-2">
                            <Tooltip title="Your coffee chat">
                                <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center hover:bg-opacity-90"
                                    onClick={() => {
                                        event("coffee_chat_list_btn_click", {
                                            category: "Action",
                                            label: address
                                        })
                                        toggleCoffeeChatList()
                                    }
                                    }>
                                    <CarryOutOutlined />
                                </div>
                            </Tooltip>
                        </div>
                    </div>

                </Transition.Child>

            </Transition>

            <button
                className='absolute left-5 bottom-5 z-10 rounded-full flex justify-center items-center p-2 bg-white w-16 h-16 hover:text-[#6f4e37] hover:bg-opacity-90'
                onClick={() => {
                    event("option_btn_click", {
                        category: "Action",
                        label: address
                    })
                    setOptionShow(!optionShow)
                }}
            >
                <CoffeeOutlined className='text-[25px]' color='#6f4e37' />
            </button>
            <CoffeeChatList open={coffeeChatListModalOpen} toggle={toggleCoffeeChatList} />
            <ScanQrcodeModal open={cameraOpen} toggle={toggleCamera} />
            <RatingModal open={ratingOpen} toggle={toggleRating} />
        </div>
    )
}

export default OptionButton