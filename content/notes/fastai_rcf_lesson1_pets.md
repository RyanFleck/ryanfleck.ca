---
tags:
- Machine Learning 
date: 2019-07-08T16:44:16-04:00
title: "FastAI Jupyter Notebook"
subtitle: ""
---

# Lesson 1 - What's your pet


```python
# fastai -> Library for training neural networks.
# fast.ai -> The organization that runs the training.
# fastai built on PyTorch.

print('Loading fastai libs.')
!curl https://course.fast.ai/setup/colab | bash
# Remember to 1. Enable GPU, 2. Reset all runtimes, 3. Run this command.

# Save files to fastAI directory in Google Drive.
print('Connecting to Google Drive to store data.')
from google.colab import drive
drive.mount('/content/gdrive', force_remount=True)

```

    Loading fastai libs.
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100   321  100   321    0     0   1671      0 --:--:-- --:--:-- --:--:--  1680
    Updating fastai...
    Done.
    Connecting to Google Drive to store data.
    Go to this URL in a browser: https://accounts.google.com/o/oauth2/auth?client_id=947318989803-6bn6qk8qdgf4n4g3pfee6491hc0brc4i.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&scope=email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdocs.test%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.photos.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fpeopleapi.readonly&response_type=code
    
    Enter your authorization code:
    ··········
    Mounted at /content/gdrive
    Changing path to lesson one.



    ---------------------------------------------------------------------------

    NameError                                 Traceback (most recent call last)

    <ipython-input-1-7bf5731846ba> in <module>()
         12 
         13 print('Changing path to lesson one.')
    ---> 14 path = Path(base_dir + 'one')
         15 path.mkdir(parents=True, exist_ok=True)
         16 


    NameError: name 'Path' is not defined



```python


root_dir = "/content/gdrive/My Drive/"
base_dir = root_dir/'fastai-v3/'

print('Changing path to lesson one.')
path = base_dir/'one'
path.mkdir(parents=True, exist_ok=True)

print('Importing dependencies.')
from fastai.vision import *
from fastai.metrics import error_rate
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    <ipython-input-2-b46799d65cab> in <module>()
          2 
          3 root_dir = "/content/gdrive/My Drive/"
    ----> 4 base_dir = root_dir/'fastai-v3/'
          5 
          6 print('Changing path to lesson one.')


    TypeError: unsupported operand type(s) for /: 'str' and 'str'


Welcome to lesson 1! For those of you who are using a Jupyter Notebook for the first time, you can learn about this useful tool in a tutorial we prepared specially for you; click `File`->`Open` now and click `00_notebook_tutorial.ipynb`. 

In this lesson we will build our first image classifier from scratch, and see if we can achieve world-class results. Let's dive in!

Every notebook starts with the following three lines; they ensure that any edits to libraries you make are reloaded here automatically, and also that any charts or images displayed are shown in this notebook.

We import all the necessary packages. We are going to work with the [fastai V1 library](http://www.fast.ai/2018/10/02/fastai-ai/) which sits on top of [Pytorch 1.0](https://hackernoon.com/pytorch-1-0-468332ba5163). The fastai library provides many useful functions that enable us to quickly and easily build neural networks and train our models.


```python
# Moved 
```

If you're using a computer with an unusually small GPU, you may get an out of memory error when running this notebook. If this happens, click Kernel->Restart, uncomment the 2nd line below to use a smaller *batch size* (you'll learn all about what this means during the course), and try again.


```python
bs = 64
# bs = 16   # uncomment this line if you run out of memory even after clicking Kernel->Restart
```

## Looking at the data

We are going to use the [Oxford-IIIT Pet Dataset](http://www.robots.ox.ac.uk/~vgg/data/pets/) by [O. M. Parkhi et al., 2012](http://www.robots.ox.ac.uk/~vgg/publications/2012/parkhi12a/parkhi12a.pdf) which features 12 cat breeds and 25 dogs breeds. Our model will need to learn to differentiate between these 37 distinct categories. According to their paper, the best accuracy they could get in 2012 was 59.21%, using a complex model that was specific to pet detection, with separate "Image", "Head", and "Body" models for the pet photos. Let's see how accurate we can be using deep learning!

We are going to use the `untar_data` function to which we must pass a URL as an argument and which will download and extract the data.


```python
help(untar_data)
```

    Help on function untar_data in module fastai.datasets:
    
    untar_data(url:str, fname:Union[pathlib.Path, str]=None, dest:Union[pathlib.Path, str]=None, data=True, force_download=False) -> pathlib.Path
        Download `url` to `fname` if `dest` doesn't exist, and un-tgz to folder `dest`.
    



```python
path = untar_data(URLs.PETS); path
```




    PosixPath('/root/.fastai/data/oxford-iiit-pet')




```python
path.ls()
```




    [PosixPath('/root/.fastai/data/oxford-iiit-pet/annotations'),
     PosixPath('/root/.fastai/data/oxford-iiit-pet/images')]




```python
path_anno = path/'annotations'
path_img = path/'images' # Whoa, a path object?
path_img
```




    PosixPath('/root/.fastai/data/oxford-iiit-pet/images')



The first thing we do when we approach a problem is to take a look at the data. We _always_ need to understand very well what the problem is and what the data looks like before we can figure out how to solve it. Taking a look at the data means understanding how the data directories are structured, what the labels are and what some sample images look like.

The main difference between the handling of image classification datasets is the way labels are stored. In this particular dataset, labels are stored in the filenames themselves. We will need to extract them to be able to classify the images into the correct categories. Fortunately, the fastai library has a handy function made exactly for this, `ImageDataBunch.from_name_re` gets the labels from the filenames using a [regular expression](https://docs.python.org/3.6/library/re.html).


```python
fnames = get_image_files(path_img)
fnames[:5]
```




    [PosixPath('/root/.fastai/data/oxford-iiit-pet/images/american_bulldog_71.jpg'),
     PosixPath('/root/.fastai/data/oxford-iiit-pet/images/basset_hound_62.jpg'),
     PosixPath('/root/.fastai/data/oxford-iiit-pet/images/Maine_Coon_83.jpg'),
     PosixPath('/root/.fastai/data/oxford-iiit-pet/images/scottish_terrier_106.jpg'),
     PosixPath('/root/.fastai/data/oxford-iiit-pet/images/havanese_58.jpg')]




```python
np.random.seed(2)
pat = r'/([^/]+)_\d+.jpg$'path = Path(base_dir + 'data/bears')
dest = path/folder
dest.mkdir(parents=True, exist_ok=True)
```


```python
data = ImageDataBunch.from_name_re(path_img, fnames, pat, ds_tfms=get_transforms(), size=224, bs=bs
                                  ).normalize(imagenet_stats)
```


```python
data.show_batch(rows=3, figsize=(7,6))
```


![png](fastai_rcf_lesson1_pets_files/fastai_rcf_lesson1_pets_18_0.png)



```python
print(data.classes)
len(data.classes),data.c
```

    ['Abyssinian', 'Bengal', 'Birman', 'Bombay', 'British_Shorthair', 'Egyptian_Mau', 'Maine_Coon', 'Persian', 'Ragdoll', 'Russian_Blue', 'Siamese', 'Sphynx', 'american_bulldog', 'american_pit_bull_terrier', 'basset_hound', 'beagle', 'boxer', 'chihuahua', 'english_cocker_spaniel', 'english_setter', 'german_shorthaired', 'great_pyrenees', 'havanese', 'japanese_chin', 'keeshond', 'leonberger', 'miniature_pinscher', 'newfoundland', 'pomeranian', 'pug', 'saint_bernard', 'samoyed', 'scottish_terrier', 'shiba_inu', 'staffordshire_bull_terrier', 'wheaten_terrier', 'yorkshire_terrier']





    (37, 37)



## Training: resnet34

Now we will start training our model. We will use a [convolutional neural network](http://cs231n.github.io/convolutional-networks/) backbone and a fully connected head with a single hidden layer as a classifier. Don't know what these things mean? Not to worry, we will dive deeper in the coming lessons. For the moment you need to know that we are building a model which will take images as input and will output the predicted probability for each of the categories (in this case, it will have 37 outputs).

We will train for 4 epochs (4 cycles through all our data).


```python
learn = cnn_learner(data, models.resnet34, metrics=error_rate)
```


```python
learn.model
```




    Sequential(
      (0): Sequential(
        (0): Conv2d(3, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
        (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (2): ReLU(inplace)
        (3): MaxPool2d(kernel_size=3, stride=2, padding=1, dilation=1, ceil_mode=False)
        (4): Sequential(
          (0): BasicBlock(
            (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (1): BasicBlock(
            (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (2): BasicBlock(
            (conv1): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(64, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
        )
        (5): Sequential(
          (0): BasicBlock(
            (conv1): Conv2d(64, 128, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (downsample): Sequential(
              (0): Conv2d(64, 128, kernel_size=(1, 1), stride=(2, 2), bias=False)
              (1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            )
          )
          (1): BasicBlock(
            (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (2): BasicBlock(
            (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (3): BasicBlock(
            (conv1): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(128, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
        )
        (6): Sequential(
          (0): BasicBlock(
            (conv1): Conv2d(128, 256, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (downsample): Sequential(
              (0): Conv2d(128, 256, kernel_size=(1, 1), stride=(2, 2), bias=False)
              (1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            )
          )
          (1): BasicBlock(
            (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (2): BasicBlock(
            (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (3): BasicBlock(
            (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (4): BasicBlock(
            (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (5): BasicBlock(
            (conv1): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(256, 256, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
        )
        (7): Sequential(
          (0): BasicBlock(
            (conv1): Conv2d(256, 512, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (downsample): Sequential(
              (0): Conv2d(256, 512, kernel_size=(1, 1), stride=(2, 2), bias=False)
              (1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            )
          )
          (1): BasicBlock(
            (conv1): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
          (2): BasicBlock(
            (conv1): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
            (relu): ReLU(inplace)
            (conv2): Conv2d(512, 512, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1), bias=False)
            (bn2): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
          )
        )
      )
      (1): Sequential(
        (0): AdaptiveConcatPool2d(
          (ap): AdaptiveAvgPool2d(output_size=1)
          (mp): AdaptiveMaxPool2d(output_size=1)
        )
        (1): Flatten()
        (2): BatchNorm1d(1024, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (3): Dropout(p=0.25)
        (4): Linear(in_features=1024, out_features=512, bias=True)
        (5): ReLU(inplace)
        (6): BatchNorm1d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
        (7): Dropout(p=0.5)
        (8): Linear(in_features=512, out_features=37, bias=True)
      )
    )




```python
learn.fit_one_cycle(4)
```


Total time: 01:46 <p><table style='width:300px; margin-bottom:10px'>
  <tr>
    <th>epoch</th>
    <th>train_loss</th>
    <th>valid_loss</th>
    <th>error_rate</th>
  </tr>
  <tr>
    <th>1</th>
    <th>1.409939</th>
    <th>0.357608</th>
    <th>0.102165</th>
  </tr>
  <tr>
    <th>2</th>
    <th>0.539408</th>
    <th>0.242496</th>
    <th>0.073072</th>
  </tr>
  <tr>
    <th>3</th>
    <th>0.340212</th>
    <th>0.221338</th>
    <th>0.066306</th>
  </tr>
  <tr>
    <th>4</th>
    <th>0.261859</th>
    <th>0.216619</th>
    <th>0.071042</th>
  </tr>
</table>




```python
learn.save('stage-1')
```

## Results

Let's see what results we have got. 

We will first see which were the categories that the model most confused with one another. We will try to see if what the model predicted was reasonable or not. In this case the mistakes look reasonable (none of the mistakes seems obviously naive). This is an indicator that our classifier is working correctly. 

Furthermore, when we plot the confusion matrix, we can see that the distribution is heavily skewed: the model makes the same mistakes over and over again but it rarely confuses other categories. This suggests that it just finds it difficult to distinguish some specific categories between each other; this is normal behaviour.


```python
interp = ClassificationInterpretation.from_learner(learn)

losses,idxs = interp.top_losses()

len(data.valid_ds)==len(losses)==len(idxs)
```




    True




```python
interp.plot_top_losses(9, figsize=(15,11))
```


![png](fastai_rcf_lesson1_pets_files/fastai_rcf_lesson1_pets_29_0.png)



```python
doc(interp.plot_top_losses)
```


```python
interp.plot_confusion_matrix(figsize=(12,12), dpi=60)
```


![png](fastai_rcf_lesson1_pets_files/fastai_rcf_lesson1_pets_31_0.png)



```python
interp.most_confused(min_val=2)
```




    [('British_Shorthair', 'Russian_Blue', 5),
     ('Ragdoll', 'Birman', 5),
     ('staffordshire_bull_terrier', 'american_pit_bull_terrier', 5),
     ('Birman', 'Ragdoll', 3),
     ('Birman', 'Siamese', 3),
     ('Persian', 'Maine_Coon', 3),
     ('Persian', 'Ragdoll', 3),
     ('Russian_Blue', 'British_Shorthair', 3),
     ('american_bulldog', 'american_pit_bull_terrier', 3),
     ('american_pit_bull_terrier', 'staffordshire_bull_terrier', 3),
     ('chihuahua', 'miniature_pinscher', 3)]



## Unfreezing, fine-tuning, and learning rates

Since our model is working as we expect it to, we will *unfreeze* our model and train some more.


```python
learn.unfreeze()
```


```python
learn.fit_one_cycle(1)
```


Total time: 00:26 <p><table style='width:300px; margin-bottom:10px'>
  <tr>
    <th>epoch</th>
    <th>train_loss</th>
    <th>valid_loss</th>
    <th>error_rate</th>
  </tr>
  <tr>
    <th>1</th>
    <th>0.558166</th>
    <th>0.314579</th>
    <th>0.101489</th>
  </tr>
</table>




```python
learn.load('stage-1');
```


```python
learn.lr_find()
```





    LR Finder is complete, type {learner_name}.recorder.plot() to see the graph.



```python
learn.recorder.plot()
```


![png](fastai_rcf_lesson1_pets_files/fastai_rcf_lesson1_pets_39_0.png)



```python
learn.unfreeze()
learn.fit_one_cycle(2, max_lr=slice(1e-6,1e-4))
```


Total time: 00:53 <p><table style='width:300px; margin-bottom:10px'>
  <tr>
    <th>epoch</th>
    <th>train_loss</th>
    <th>valid_loss</th>
    <th>error_rate</th>
  </tr>
  <tr>
    <th>1</th>
    <th>0.242544</th>
    <th>0.208489</th>
    <th>0.067659</th>
  </tr>
  <tr>
    <th>2</th>
    <th>0.206940</th>
    <th>0.204482</th>
    <th>0.062246</th>
  </tr>
</table>



That's a pretty accurate model!

## Training: resnet50

Now we will train in the same way as before but with one caveat: instead of using resnet34 as our backbone we will use resnet50 (resnet34 is a 34 layer residual network while resnet50 has 50 layers. It will be explained later in the course and you can learn the details in the [resnet paper](https://arxiv.org/pdf/1512.03385.pdf)).

Basically, resnet50 usually performs better because it is a deeper network with more parameters. Let's see if we can achieve a higher performance here. To help it along, let's us use larger images too, since that way the network can see more detail. We reduce the batch size a bit since otherwise this larger network will require more GPU memory.


```python
data = ImageDataBunch.from_name_re(path_img, fnames, pat, ds_tfms=get_transforms(),
                                   size=299, bs=bs//2).normalize(imagenet_stats)
```


```python
learn = cnn_learner(data, models.resnet50, metrics=error_rate)
```


```python
learn.lr_find()
learn.recorder.plot()
```

    LR Finder complete, type {learner_name}.recorder.plot() to see the graph.



![png](fastai_rcf_lesson1_pets_files/fastai_rcf_lesson1_pets_46_1.png)



```python
learn.fit_one_cycle(8)
```

    Total time: 06:59
    epoch  train_loss  valid_loss  error_rate
    1      0.548006    0.268912    0.076455    (00:57)
    2      0.365533    0.193667    0.064953    (00:51)
    3      0.336032    0.211020    0.073072    (00:51)
    4      0.263173    0.212025    0.060893    (00:51)
    5      0.217016    0.183195    0.063599    (00:51)
    6      0.161002    0.167274    0.048038    (00:51)
    7      0.086668    0.143490    0.044655    (00:51)
    8      0.082288    0.154927    0.046008    (00:51)
    



```python
learn.save('stage-1-50')
```

It's astonishing that it's possible to recognize pet breeds so accurately! Let's see if full fine-tuning helps:


```python
learn.unfreeze()
learn.fit_one_cycle(3, max_lr=slice(1e-6,1e-4))
```

    Total time: 03:27
    epoch  train_loss  valid_loss  error_rate
    1      0.097319    0.155017    0.048038    (01:10)
    2      0.074885    0.144853    0.044655    (01:08)
    3      0.063509    0.144917    0.043978    (01:08)
    


If it doesn't, you can always go back to your previous model.


```python
learn.load('stage-1-50');
```


```python
interp = ClassificationInterpretation.from_learner(learn)
```


```python
interp.most_confused(min_val=2)
```




    [('american_pit_bull_terrier', 'staffordshire_bull_terrier', 6),
     ('Bengal', 'Egyptian_Mau', 5),
     ('Bengal', 'Abyssinian', 4),
     ('boxer', 'american_bulldog', 4),
     ('Ragdoll', 'Birman', 4),
     ('Egyptian_Mau', 'Bengal', 3)]



## Other data formats


```python
path = untar_data(URLs.MNIST_SAMPLE); path
```




    PosixPath('/home/ubuntu/course-v3/nbs/dl1/data/mnist_sample')




```python
tfms = get_transforms(do_flip=False)
data = ImageDataBunch.from_folder(path, ds_tfms=tfms, size=26)
```


```python
data.show_batch(rows=3, figsize=(5,5))
```


![png](fastai_rcf_lesson1_pets_files/fastai_rcf_lesson1_pets_58_0.png)



```python
learn = cnn_learner(data, models.resnet18, metrics=accuracy)
learn.fit(2)
```

    Total time: 00:23
    epoch  train_loss  valid_loss  accuracy
    1      0.116117    0.029745    0.991168  (00:12)
    2      0.056860    0.015974    0.994603  (00:10)
    



```python
df = pd.read_csv(path/'labels.csv')
df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>name</th>
      <th>label</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>train/3/7463.png</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>train/3/21102.png</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>train/3/31559.png</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>train/3/46882.png</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>train/3/26209.png</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
data = ImageDataBunch.from_csv(path, ds_tfms=tfms, size=28)
```


```python
data.show_batch(rows=3, figsize=(5,5))
data.classes
```




    [0, 1]




![png](fastai_rcf_lesson1_pets_files/fastai_rcf_lesson1_pets_62_1.png)



```python
data = ImageDataBunch.from_df(path, df, ds_tfms=tfms, size=24)
data.classes
```




    [0, 1]




```python
fn_paths = [path/name for name in df['name']]; fn_paths[:2]
```




    [PosixPath('/home/ubuntu/course-v3/nbs/dl1/data/mnist_sample/train/3/7463.png'),
     PosixPath('/home/ubuntu/course-v3/nbs/dl1/data/mnist_sample/train/3/21102.png')]




```python
pat = r"/(\d)/\d+\.png$"
data = ImageDataBunch.from_name_re(path, fn_paths, pat=pat, ds_tfms=tfms, size=24)
data.classes
```




    ['3', '7']




```python
data = ImageDataBunch.from_name_func(path, fn_paths, ds_tfms=tfms, size=24,
        label_func = lambda x: '3' if '/3/' in str(x) else '7')
data.classes
```




    ['3', '7']




```python
labels = [('3' if '/3/' in str(x) else '7') for x in fn_paths]
labels[:5]
```




    ['3', '3', '3', '3', '3']




```python
data = ImageDataBunch.from_lists(path, fn_paths, labels=labels, ds_tfms=tfms, size=24)
data.classes
```




    ['3', '7']




```python

```
