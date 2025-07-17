import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useContext, useState } from 'react'
import { CredsContext } from '@/context/credentials'
import { toast } from 'sonner'

export function CredsModal() {

    const { creds, setCreds } = useContext(CredsContext)
    const [openaiKey, setOpenaiKey] = useState(creds.openaiKey || '')
    const [geminiKey, setGeminiKey] = useState(creds.geminiKey || '')

    const save = () => {
        setCreds({ openaiKey, geminiKey })
        // optionally toast “Keys saved”

        toast.success('Keys Saved');

    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add your Keys</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter your API Keys</DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Chat</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Keys</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
