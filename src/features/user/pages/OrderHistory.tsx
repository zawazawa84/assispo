import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export const OrderHistory = () => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
        <Separator className="my-2" />
      </header>
      <Tabs defaultValue="before">
        <div className="flex mt-8 space-x-8">
          <TabsList className="ml-56">
            <TabsTrigger value="before" className="w-52">
              到着前商品
            </TabsTrigger>
            <TabsTrigger value="after" className="w-52">
              到着済み商品
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="before" className="h-screen mt-8 ml-56 mr-56">
          <div className="p-12 space-y-5 border border-[#dcdcdc] rounded-md bg-[#f6f6f6]">
            <Card className="px-4 pt-4 border-0 rounded-md">
              <CardHeader>
                <h1 className="text-xl pb-4 border-b border-[#dcdcdc]">
                  配達処理中
                </h1>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <Image
                    src={`/item3.png`}
                    alt=""
                    width={230}
                    height={220}
                    className="rounded-sm object-contain aspect-square bg-secondary"
                  />
                  <div className="w-2/5 space-y-3 pl-5">
                    <p>
                      テスト衣装ああああああああああああああああああああああああああああああああああああああああああああああああ
                    </p>
                    <p className="text-sm text-[#989898]">シニア</p>
                    <p className="text-sm text-[#989898]">7日間</p>
                    <p>¥3,960</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <span className="text-[#989898]">注文日&emsp; :</span>{' '}
                        2023.9.28
                      </p>
                      <p>
                        <span className="text-[#989898]">注文番号 :</span>{' '}
                        0000000000
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-themeblue">
                        <p>注文詳細</p>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-themeblue"
                        disabled={true}
                      >
                        <p className="text-themeblue">商品到着を確認</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full pt-6 space-x-5 border-t border-[#dcdcdc]">
                  <p>
                    <span className="text-[#989898]">合計金額 :</span> ¥5,430
                  </p>
                  <p>
                    <span className="text-[#989898]">支払い方法 :</span> 現金
                  </p>
                </div>
              </CardFooter>
            </Card>
            <Card className="px-4 pt-4 border-0 rounded-md">
              <CardHeader>
                <h1 className="text-xl pb-4 border-b border-[#dcdcdc]">
                  配達中
                </h1>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <Image
                    src={`/item3.png`}
                    alt=""
                    width={230}
                    height={220}
                    className="rounded-sm object-contain aspect-square bg-secondary"
                  />
                  <div className="w-2/5 space-y-3 pl-5">
                    <p>
                      テスト衣装ああああああああああああああああああああああああああああああああああああああああああああああああ
                    </p>
                    <p className="text-sm text-[#989898]">シニア</p>
                    <p className="text-sm text-[#989898]">7日間</p>
                    <p>¥3,960</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <span className="text-[#989898]">注文日&emsp; :</span>{' '}
                        2023.9.28
                      </p>
                      <p>
                        <span className="text-[#989898]">注文番号 :</span>{' '}
                        0000000000
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-themeblue">
                        <p>注文詳細</p>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-themeblue"
                      >
                        <p className="text-themeblue">商品到着を確認</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full pt-6 space-x-5 border-t border-[#dcdcdc]">
                  <p>
                    <span className="text-[#989898]">合計金額 :</span> ¥5,430
                  </p>
                  <p>
                    <span className="text-[#989898]">支払い方法 :</span> 現金
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="after" className="h-screen mt-8 ml-56 mr-56">
          <div className="p-12 space-y-5 border border-[#dcdcdc] rounded-md bg-[#f6f6f6]">
            <Card className="px-4 pt-4 border-0 rounded-md">
              <CardHeader>
                <h1 className="text-xl pb-4 border-b border-[#dcdcdc]">
                  レンタル期間中
                </h1>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <Image
                    src={`/item3.png`}
                    alt=""
                    width={230}
                    height={220}
                    className="rounded-sm object-contain aspect-square bg-secondary"
                  />
                  <div className="w-2/5 space-y-3 pl-5">
                    <p>
                      テスト衣装ああああああああああああああああああああああああああああああああああああああああああああああああ
                    </p>
                    <p className="text-sm text-[#989898]">シニア</p>
                    <p className="text-sm text-[#989898]">7日間</p>
                    <p>¥3,960</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <span className="text-[#989898]">注文日&emsp; :</span>{' '}
                        2023.9.28
                      </p>
                      <p>
                        <span className="text-[#989898]">注文番号 :</span>{' '}
                        0000000000
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-themeblue">
                        <p>注文詳細</p>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-themeblue"
                      >
                        <p className="text-themeblue">商品返却手続き</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full pt-6 space-x-5 border-t border-[#dcdcdc]">
                  <p>
                    <span className="text-[#989898]">合計金額 :</span> ¥5,430
                  </p>
                  <p>
                    <span className="text-[#989898]">支払い方法 :</span> 現金
                  </p>
                </div>
              </CardFooter>
            </Card>
            <Card className="px-4 pt-4 border-0 rounded-md">
              <CardHeader>
                <h1 className="text-xl pb-4 border-b border-[#dcdcdc]">
                  レンタル期間切れ
                </h1>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <Image
                    src={`/item3.png`}
                    alt=""
                    width={230}
                    height={220}
                    className="rounded-sm object-contain aspect-square bg-secondary"
                  />
                  <div className="w-2/5 space-y-3 pl-5">
                    <p>
                      テスト衣装ああああああああああああああああああああああああああああああああああああああああああああああああ
                    </p>
                    <p className="text-sm text-[#989898]">シニア</p>
                    <p className="text-sm text-[#989898]">7日間</p>
                    <p>¥3,960</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <span className="text-[#989898]">注文日&emsp; :</span>{' '}
                        2023.9.28
                      </p>
                      <p>
                        <span className="text-[#989898]">注文番号 :</span>{' '}
                        0000000000
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-themeblue">
                        <p>注文詳細</p>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-themeblue"
                      >
                        <p className="text-themeblue">商品返却手続き</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full pt-6 space-x-5 border-t border-[#dcdcdc]">
                  <p>
                    <span className="text-[#989898]">合計金額 :</span> ¥5,430
                  </p>
                  <p>
                    <span className="text-[#989898]">支払い方法 :</span> 現金
                  </p>
                </div>
              </CardFooter>
            </Card>
            <Card className="px-4 pt-4 border-0 rounded-md">
              <CardHeader>
                <h1 className="text-xl pb-4 border-b border-[#dcdcdc]">
                  返却中
                </h1>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <Image
                    src={`/item3.png`}
                    alt=""
                    width={230}
                    height={220}
                    className="rounded-sm object-contain aspect-square bg-secondary"
                  />
                  <div className="w-2/5 space-y-3 pl-5">
                    <p>
                      テスト衣装ああああああああああああああああああああああああああああああああああああああああああああああああ
                    </p>
                    <p className="text-sm text-[#989898]">シニア</p>
                    <p className="text-sm text-[#989898]">7日間</p>
                    <p>¥3,960</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <span className="text-[#989898]">注文日&emsp; :</span>{' '}
                        2023.9.28
                      </p>
                      <p>
                        <span className="text-[#989898]">注文番号 :</span>{' '}
                        0000000000
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-themeblue">
                        <p>注文詳細</p>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-themeblue"
                        disabled={true}
                      >
                        <p className="text-themeblue">商品返却手続き</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full pt-6 space-x-5 border-t border-[#dcdcdc]">
                  <p>
                    <span className="text-[#989898]">合計金額 :</span> ¥5,430
                  </p>
                  <p>
                    <span className="text-[#989898]">支払い方法 :</span> 現金
                  </p>
                </div>
              </CardFooter>
            </Card>
            <Card className="px-4 pt-4 border-0 rounded-md">
              <CardHeader>
                <h1 className="text-xl pb-4 border-b border-[#dcdcdc]">
                  返却済み
                </h1>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <Image
                    src={`/item3.png`}
                    alt=""
                    width={230}
                    height={220}
                    className="rounded-sm object-contain aspect-square bg-secondary"
                  />
                  <div className="w-2/5 space-y-3 pl-5">
                    <p>
                      テスト衣装ああああああああああああああああああああああああああああああああああああああああああああああああ
                    </p>
                    <p className="text-sm text-[#989898]">シニア</p>
                    <p className="text-sm text-[#989898]">7日間</p>
                    <p>¥3,960</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p>
                        <span className="text-[#989898]">注文日&emsp; :</span>{' '}
                        2023.9.28
                      </p>
                      <p>
                        <span className="text-[#989898]">注文番号 :</span>{' '}
                        0000000000
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-themeblue">
                        <p>注文詳細</p>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-themeblue"
                        disabled={true}
                      >
                        <p className="text-themeblue">商品返却手続き</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full pt-6 space-x-5 border-t border-[#dcdcdc]">
                  <p>
                    <span className="text-[#989898]">合計金額 :</span> ¥5,430
                  </p>
                  <p>
                    <span className="text-[#989898]">支払い方法 :</span> 現金
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
