import React, { useReducer, Dispatch } from 'react'
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { Dialog, Transition } from "@headlessui/react";
import { Domain } from "domain";
import { CoffeeOutlined, CameraOutlined, StarOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd';
import { useMediaQuery } from 'react-responsive'

import PlaceAutoCompleteMobile from './PlaceAutoCompleteMobile';


type Props = {
    open: boolean;
    setOpen: Dispatch<boolean>
    setZoom: Dispatch<number>
    clicked: boolean;
    setClicked: Dispatch<boolean>;
    placeId: string;
    setPlaceId: Dispatch<string>;
    setDrawerShow: Dispatch<boolean>;
    clickedPoint: {
        lat: number;
        lng: number;
    }
    setClickedPoint: Dispatch<{
        lat: number;
        lng: number;
    }>
}

const SearchModal = ({ open, setOpen, setZoom, clicked, setClicked, placeId, setPlaceId, setDrawerShow, clickedPoint, setClickedPoint }: Props) => {



    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { setOpen(false) }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>

                <div className="fixed top-[100px] inset-x-0 overflow-y-auto">
                    <div className="flex items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                                <PlaceAutoCompleteMobile
                                    setOpen={setOpen}
                                    setZoom={setZoom}
                                    clicked={clicked}
                                    setClicked={setClicked}
                                    placeId={placeId}
                                    setPlaceId={setPlaceId}
                                    setDrawerShow={setDrawerShow}
                                    clickedPoint={clickedPoint}
                                    setClickedPoint={setClickedPoint} />

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>





    )
}

export default SearchModal