import { Avatar } from "@material-ui/core";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import React from "react";
import MicOffIcon from "../../icons/ParticipantTabPanel/MicOffIcon";
import MicOnIcon from "../../icons/ParticipantTabPanel/MicOnIcon";
import VideoCamOffIcon from "../../icons/ParticipantTabPanel/VideoCamOffIcon";
import VideoCamOnIcon from "../../icons/ParticipantTabPanel/VideoCamOnIcon";
import { nameTructed } from "../../utils/helper";

function ParticipantListItem({ participantId }) {
  const { participant, micOn, webcamOn, displayName, isLocal } =
    useParticipant(participantId);

  return (
    <div className="mt-2 m-2 p-2 bg-gray-700 rounded-lg mb-0">
      <div className="flex flex-1 items-center justify-center relative">
        <Avatar variant={"rounded"}>{displayName?.charAt(0)}</Avatar>
        <div className="ml-2 mr-1 flex flex-1">
          <p className="text-base text-white overflow-hidden whitespace-pre-wrap overflow-ellipsis">
            {isLocal ? "You" : nameTructed(displayName, 15)}
          </p>
        </div>
        <div className="m-1 p-1">{micOn ? <MicOnIcon /> : <MicOffIcon />}</div>
        <div className="m-1 p-1">
          {webcamOn ? <VideoCamOnIcon /> : <VideoCamOffIcon />}
        </div>
      </div>
    </div>
  );
}

export function ParticipantSidePanel({ panelHeight }) {
  const mMeeting = useMeeting();
  const participants = mMeeting.participants;
  return (
    <div
      className={`flex w-full flex-col bg-gray-750 overflow-y-auto `}
      style={{ height: panelHeight }}
    >
      <div
        className="flex flex-col flex-1"
        style={{ height: panelHeight - 100 }}
      >
        {[...participants.keys()].map((participantId) => {
          return <ParticipantListItem participantId={participantId} />;
        })}
      </div>
    </div>
  );
}