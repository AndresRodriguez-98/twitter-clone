import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar } from '@nextui-org/react'

export default function PostCard ({
  userFullName,
  userName,
  avatarUrl,
  content
}: {
  userFullName: string
  userName: string
  avatarUrl: string
  content: string
}) {
  return (
        <Card className="max-w-[340px]">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src={avatarUrl} />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                        <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                    </div>
                </div>

            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <p>
                    {content}
                </p>

            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">4</p>
                    <p className=" text-default-400 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">Followers</p>
                </div>
            </CardFooter>
        </Card>
  )
}