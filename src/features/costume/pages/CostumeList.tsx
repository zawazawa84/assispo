'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CostumeList = () => {
  const [isActive, setIsActive] = useState<string>();

  return (
    <Tabs defaultValue="account" value={isActive} onValueChange={setIsActive}>
      <TabsList className="flex justify-start w-full pl-32">
        <TabsTrigger value="account" className="w-[200px] mb-[-8px]">
          商品
        </TabsTrigger>
        <TabsTrigger value="password" className="w-[200px] mb-[-8px]">
          お気に入り
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};
