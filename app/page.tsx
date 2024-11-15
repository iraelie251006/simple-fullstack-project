"use client"

import {useForm} from "react-hook-form";
import {useRouter} from 'next/router'
import axios from 'axios'
import {Form, FormControl, FormDescription,
        FormField, FormItem, FormLabel,
        FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"



const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    })
})

export default function Home() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/courses', values)
        } catch (error) {
            console.log(error)
        }
    }
  return (
   <div className="pt-40 bg-black text-center">
     <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                    <FormItem className="flex justify-center items-center flex-col mt-[20px]">
                        <FormLabel className="text-white text-2xl font-bold">Title</FormLabel>
                        <FormControl className="w-[500px] text-slate-900">
                            <Input {...field} placeholder="Course Title"/>
                        </FormControl>
                    </FormItem>
                )}
            />
             <button type="submit" className="bg-slate-900 p-4 mt-6 rounded text-white font-semibold">
                 Submit
             </button>
         </form>
     </Form>
   </div>
  );
}
