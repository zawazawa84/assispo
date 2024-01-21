'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/lib/firebase/sdk';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { costumeProps } from '@/utils/enum';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

export const RegisterCostume = () => {
  const [imagePreview, setImagePreview] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<costumeProps>();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${data.image[0].name}`);
    await uploadBytes(storageRef, data.image[0]);
    const imageUrl = await getDownloadURL(storageRef);

    data.washable = (data.washable as unknown as string) == '1' ? true : false;
    await addDoc(collection(db, 'products'), {
      category: data.category,
      deliveryCharge: 'assispo負担',
      image: imageUrl,
      isRented: false,
      name: data.name,
      others: data.others,
      price: data.price,
      size: data.size,
      state: data.state,
      washable: data.washable,
      description: data.description,
    });
    toast({ title: '衣装を登録しました' });
  });

  return (
    <div className="mx-auto max-w-screen-2xl p-4 space-y-8">
      <h1 className="text-4xl font-bold mt-4">管理画面</h1>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-bold text-slate-500 ">衣装登録</h1>
      </div>
      <div className="flex space-x-4">
        <div className="w-full flex flex-col">
          <div className="w-full">
            <label className="text-gray-700 font-bold">画像</label>
            <Input
              type="file"
              {...register('image')}
              onChange={handleImageChange}
            />
          </div>
          {imagePreview && (
            <img src={imagePreview} alt="" width={300} height={300} />
          )}
        </div>
        <form className="space-y-4 w-full" onSubmit={onSubmit}>
          <div>
            <label className="text-gray-700 font-bold">衣装名</label>
            <Input {...register('name')} />
          </div>
          <div>
            <label className="text-gray-700 font-bold">カテゴリ</label>
            <Input {...register('category')} />
          </div>
          <div>
            <label className="text-gray-700 font-bold">価格</label>
            <Input {...register('price')} />
          </div>
          <div>
            <label className="text-gray-700 font-bold">サイズ</label>
            <Controller
              control={control}
              name="size"
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} defaultValue={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Child(~小学6年生)</SelectItem>
                      <SelectItem value="2">Junior(中学1~3年生)</SelectItem>
                      <SelectItem value="3">Senior(高校1年生~)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="text-gray-700 font-bold">状態</label>
            <Input {...register('state')} />
          </div>
          <div>
            <label className="text-gray-700 font-bold">洗濯</label>
            <Controller
              control={control}
              name="size"
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} defaultValue={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Washable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">可</SelectItem>
                      <SelectItem value="2">不可</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="text-gray-700 font-bold">その他</label>
            <Textarea {...register('others')} />
          </div>
          <div>
            <label className="text-gray-700 font-bold">説明</label>
            <Textarea {...register('description')} />
          </div>
          <Button
            type="submit"
            className="bg-themeblue"
            disabled={isSubmitting}
          >
            衣装登録
          </Button>
        </form>
      </div>
    </div>
  );
};
